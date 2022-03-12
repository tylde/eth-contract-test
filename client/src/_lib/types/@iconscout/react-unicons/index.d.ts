declare module '@iconscout/react-unicons' {
  export type UilProps = {
    color?: string;
    size?: number;
  };

  export type Icon = (props: UilProps) => JSX.Element;

  export const UilArchive: Icon;
  export const UilBars: Icon;
  export const UilEnvelope: Icon;
  export const UilKeyholeSquare: Icon;
  export const UilLock: Icon;
  export const UilTachometerFast: Icon;
  export const UilUnlock: Icon;
  export const UilSpinner: Icon;
  export const UilSpinnerAlt: Icon;
}
