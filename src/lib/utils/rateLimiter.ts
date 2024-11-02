import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 允许的最大尝试次数
  duration: 15 * 60, // 15分钟的窗口期，以秒为单位
  blockDuration: 15 * 60, // 被阻止的持续时间，以秒为单位
});

export default rateLimiter;
