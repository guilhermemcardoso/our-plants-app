import React from 'react';
import { IButtonProps, Button as NativeButton } from 'native-base';

type Props = IButtonProps & {
  title: string;
};

export default function Button({ title, variant, ...rest }: Props) {
  const getBackgroundColor = () => {
    if (variant === 'solid' || !variant) {
      return 'button.background.primary';
    }

    return null;
  };

  const getTextColor = () => {
    if (variant === 'link') {
      return 'button.text.link';
    }

    if (variant !== 'solid' && variant) {
      return 'button.background.primary';
    }

    return 'button.text.primary';
  };

  const getTextDecoration = () => {
    if (variant === 'link') {
      return 'underline';
    }

    return 'none';
  };

  return (
    <NativeButton
      variant={variant}
      borderColor={'primary.pure'}
      bgColor={getBackgroundColor()}
      _text={{ color: getTextColor(), textDecorationLine: getTextDecoration() }}
      _spinner={{ color: getTextColor() }}
      {...rest}
    >
      {title}
    </NativeButton>
  );
}
