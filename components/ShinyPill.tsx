'use client';

import type { CSSProperties } from 'react';

interface ShinyPillProps {
  text: string;
  link?: string;
  textColor: string;
  shineColor: string;
  speed: number;
  font: CSSProperties;
  style?: CSSProperties;
}

const KEYFRAMES_ID = 'shiny-pill-keyframes';

const COMPONENT_DEFAULTS = {
  text: 'SHINY PILL',
  textColor: '#FFFFFF',
  shineColor: '#78FF83',
  speed: 1.5,
  font: {
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '0.18em',
    lineHeight: '1em',
  } as CSSProperties,
};

export default function ShinyPill(props: ShinyPillProps) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const { text = 'SHINY PILL', link, textColor = '#FFFFFF', shineColor = '#78FF83', speed = 1.5, font, style } = props;

  const isFixedWidth = style?.width === '100%';

  const shellStyle: CSSProperties = {
    ...style,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    ...(isFixedWidth ? {} : { minWidth: 'max-content', width: 'auto' }),
    whiteSpace: 'nowrap',
    ...font,
  };

  const shineLayerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: shineColor,
    pointerEvents: 'none',
    WebkitMaskImage: 'linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)',
    maskImage: 'linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)',
    WebkitMaskSize: '150% auto',
    maskSize: '150% auto',
    animation: `shinyPillSweep ${speed}s ease-in-out infinite`,
  };

  const content = (
    <div style={shellStyle}>
      <style
        id={KEYFRAMES_ID}
        dangerouslySetInnerHTML={{
          __html: `@keyframes shinyPillSweep {
            0% { -webkit-mask-position: 200%; mask-position: 200%; }
            100% { -webkit-mask-position: -100%; mask-position: -100%; }
          }`,
        }}
      />
      <span style={{ color: textColor }}>{text}</span>
      <span style={shineLayerStyle} aria-hidden="true">
        {text}
      </span>
    </div>
  );

  if (link) {
    return (
      <a href={link} style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {content}
      </a>
    );
  }

  return content;
}

