import { Children, FC, ReactNode, useMemo } from 'react';
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
} from 'html-react-parser';
import { CardTextProps } from './types';
import { SmallText, SpecialCharacter, Text, TextWrapper } from './styles';

const parseOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      const children = domToReact(domNode.children, parseOptions);
      switch (domNode.name) {
        case 'b':
          return <b>{children}</b>;
        case 'i':
          return <i>{children}</i>;
        case 's':
          return <s>{children}</s>;
        case 'u':
          return <u>{children}</u>;
        case 'pkm':
          return <SpecialCharacter data-special>{children}</SpecialCharacter>;
        case 'small':
          return <SmallText>{children}</SmallText>;
        default:
          return null;
      }
    }
    return domNode;
  },
};

const CardText: FC<CardTextProps> = ({
  textOutline,
  textColor = 'black',
  unscale,
  children,
  ...props
}) => {
  const content = useMemo<ReactNode>(
    () =>
      Children.map(children, child => {
        // Only format strings, not elements
        if (typeof child !== 'string') return child;
        const contentString = child
          // Bold
          .replace(
            /(?:\*\*)(?:(?!\s))((?:(?!\*\*|\n).)+)(?:\*\*)/g,
            '<b>$1</b>',
          )
          // Italic
          .replace(/(?:__)(?:(?!\s))((?:(?!\n|__).)+)(?:__)/g, '<i>$1</i>')
          // Strikethrough
          .replace(/(?:~~)(?:(?!\s))((?:(?!\n|~~).)+)(?:~~)/g, '<s>$1</s>')
          // Underline
          .replace(/(?:--)(?:(?!\s))((?:(?!\n|--).)+)(?:--)/g, '<u>$1</u>')
          // Special Character
          .replace(/(?:\[)(?:(?!\s))((?:(?!\n|\[).)+)(?:\])/g, '<pkm>$1</pkm>')
          // Small text
          .replace(
            /(?:==)(?:(?!\s))((?:(?!\n|==).)+)(?:==)/g,
            '<small>$1</small>',
          );
        return (
          <TextWrapper $scale={unscale}>
            {parse(contentString, parseOptions)}
          </TextWrapper>
        );
      }),
    [unscale, children],
  );

  return (
    <Text
      $outline={textOutline}
      $color={textColor}
      {...props}
      position="relative"
    >
      {content}
    </Text>
  );
};

export default CardText;
