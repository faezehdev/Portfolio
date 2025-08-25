import React from 'react';

type HTMLTag = 'h1' | 'h2' | 'h3' | 'div' | 'section' | 'article' | 'span' | 'p';

interface TitleProps {
  children: React.ReactNode;
  tag?: HTMLTag;
  className?: string;
}

const Title = React.forwardRef<HTMLElement, TitleProps>(
  ({ children, tag = 'h2', className }, ref) => {
    const Tag = tag as HTMLTag;

    return (
      <Tag
        ref={ref as React.Ref<any>}
        className={`2xl:text-4xl xl:text-2xl lg:text-xl text-lg font-bold mb-6 text-primary ${className ?? ''}`}
      >
        {children}
      </Tag>
    );
  }
);

Title.displayName = 'Title';
export default Title;
