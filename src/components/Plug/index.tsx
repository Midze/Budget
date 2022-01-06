import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Plug.module.css';

interface PlugProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  type: string;
  size: string;
  count?: number
}

const Plug: React.FC<PlugProps> = ({ className, type, size, count}): JSX.Element => {
  const plugsQuantity = (type === 'circle' || count) ? count : +(Math.random() * 10).toFixed();
  const createPlugs = (quantity: number) => {
    const plugs = [];
    while(quantity) {
      plugs.push(
        <div className={cn(styles.plug, className, {
          [styles.l]: size == 'l',
          [styles.m]: size == 'm',
          [styles.s]: size == 's',
          [styles.rect]: type == 'rect',
          [styles.circle]: type == 'circle',
        })}
        ></div>
      );
      quantity--;
    }
    return plugs;
  };
  return (
    <>
      { createPlugs(plugsQuantity) }
    </>
  );
};

export default Plug;