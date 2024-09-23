/*
 * @Author: liliang
 * @Date: 2024-09-20 19:13:57
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-24 01:43:25
 * @FilePath: /advanture-island/src/app/test/StyleControlComponentDemo.tsx
 * @Description: 
 */
import React, { useState } from 'react';
import StyleControlComponent from '../../components/component/StyleControlComponent';
import  './style.scss'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

const StyleControlComponentDemo = () => {
  const [shape, setShape] = useState('circle');
  const [pos, setPos] = useState('middleCenter');
  const [color, setColor] = useState({
    object: 'white',
    border: 'black',
    text: 'red'
  });
  const [inputCon, setInputCon] = useState({
    object: "我是内容",
    border: 2,
    text: 14
    });
    const posList = {
        "topLeft": "左上",
        "topCenter": "中上",
        "topRight": "右上",
        "middleLeft": "左中",
        "middleCenter": "中心",
        "middleRight": "右中",
        "bottomLeft": "左下",
        "bottomCenter": "下中",
        "bottomRight": "右下"
        }
    const shapeList = {
        circle: '圆形',
        ellipse: '椭圆形',
        rectangle: '矩形',
        rounded: '圆角矩形',
        triangle: '正三角形'
    }
    const colorList = {
        black: '黑色',
        white:'白色',
        red: '红色',
        yellow: '黄色',
        green: '绿色',
        gray: '灰色',
        maroon: '茶色',
        silver: '银色',
    };

 
  const handleClick = (key, type, origin) => {
    if (origin === 'color') {
      setColor((prevState) => ({
            ...prevState,
            [type]: key
          }));
    };
    if (origin === 'size') {
       setInputCon((prevState) => ({
            ...prevState,
            [type]: key
          }));
    }
  }
    
    const handleChange = (colors, type) => {
         const newColor = colors.color;
        setColor((prevState) => ({
        ...prevState,
        [type]: newColor,
        }));
    };
  
const PosComponent = ({ item }) => {
  return (
    <ul>
      {Object.entries(item).map(([key, value], index) => (
          <li key={index} onClick={() => setPos(`${key}`)}>{`${value}`}</li>
      ))}
    </ul>
  );
};
    


const ShapComponent = ({ item }) => {
  return (
    <ul>
      {Object.entries(item).map(([key, value], index) => (
          <button key={index} onClick={() => setShape(`${key}`)}>{`${value}`}</button>
      ))}
    </ul>
  );
};
    

  const ColorComponent = ({ item, type, origin }) => {
  
  return (
    <ul>
      {Object.entries(item).map(([key, value], index) => (
          <li key={index} style={{ background: key }} onClick={() => handleClick(key, type, origin)}>{`${value}`}</li>
      ))}
    </ul>
  );
};
    
    const Content = ({type, origin}) => {
        return (
            <input
                type={['text', 'border'].includes(origin) ? 'number': 'text'}
                value={inputCon[type]}
              onChange={(event) => handleClick(event.target.value, type, origin)}
            />
      )

    }
    
  return (
    <div className="demo">
      <div className='left'>
        <div className='item'>
          <div>形状</div>
          <div>
            <div className='detail'><div>图形:</div><ShapComponent item={shapeList} /></div>
                      <div className='detail'>
                          <div>背景：</div>
                            <ColorPicker
                                color={color['object']}
                                onChange={(colors: any) => handleChange(colors, 'object')} 
                                placement="topLeft"
                            />
                      </div>
          </div>
        </div>

        <div className='item'>
          <div>内容</div>
          <div>
            <div className='detail'>
              <div>内容：</div>
               <Content type='object' origin="size" />
            </div>
            <div className='detail'>
              <div>字号：</div>
               <Content  type='text' origin="size" />px
            </div>
            <div className='detail'>颜色：
                <ColorPicker
                    color={color['text']}
                    onChange={(colors: any) => handleChange(colors, 'text')} 
                    placement="topLeft"
                /></div>
            <div className='detail'>位置：
              <div className='text-pos'>
                    <PosComponent item={posList} />
              </div>
            </div>
          </div>
        </div>

        <div className='item'>
          <div>边框</div>
          <div>
            <div className='detail'>大小：  <Content type='border' origin="size" />px</div>
            <div className='detail'>颜色：
                <ColorPicker
                color={color['border']}
                onChange={(colors: any) => handleChange(colors, 'border')} 
                placement="topLeft"
            /></div>
          </div>
        </div>

      </div>
      <div className='right'>
          <StyleControlComponent
          shape={shape}
          backgroundColor={color.object}
          borderSize={inputCon.border}
          borderColor={color.border}
          text={inputCon.object}
          fontSize={inputCon.text}
          fontColor={color.text}
          textPosition={pos}
      />
      </div>
          

    </div>
  );
};

export default StyleControlComponentDemo;