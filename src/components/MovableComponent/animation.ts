/**
 * 动画
 */

type KeyFrame = (progress: number) => void;

interface AnimationConfig {
  duration?: number;
  keyFrame: KeyFrame;
  onEnd?: () => void;
}

enum AnimationState {
  pause,
  playing,
  end,
}

export default class CustomAnimation {
  // 动画时长
  duration: number;
  // 关键帧函数
  keyFrame: KeyFrame;
  // 动画结束回调函数
  onEnd: () => void;

  // raf id
  rafId: number | null = null;
  // 动画状态
  state: AnimationState = AnimationState.pause;
  // 开始动画时间戳
  startTime: number = 0;

  constructor({duration = 5000, keyFrame, onEnd = () => {}}: AnimationConfig) {
    this.duration = duration;
    this.keyFrame = keyFrame;
    this.onEnd = onEnd;

    this.start();
  }

  #tick() {
    // 动画结束，直接返回
    if (this.state === AnimationState.end) {
      return;
    }

    let t = Date.now() - this.startTime;
    // 动画进度
    let progress = this.duration ? Math.min(t / this.duration, 1) : 1;
    // 处理关键帧
    this.keyFrame(progress);

    this.rafId = requestAnimationFrame(() => {
      this.#tick();
    });

    // 超过duration，结束动画
    if (t >= this.duration) {
      this.end();
    }
  }

  start() {
    if (this.state === AnimationState.playing) {
      this.end();
    }
    this.state = AnimationState.playing;
    this.startTime = Date.now();
    this.#tick();
  }

  end() {
    if (this.state !== AnimationState.playing) {
      return;
    }
    this.state = AnimationState.end;
    this.rafId !== null && cancelAnimationFrame(this.rafId);
    this.onEnd();
  }
}

