declare module '@iconscout/react-unicons' {
  export type UilProps = {
    color?: string;
    size?: number;
  };

  export type Icon = (props: UilProps) => JSX.Element;

  export const UilArchive: Icon;
  export const UilBars: Icon;
  export const UilBrightnessEmpty: Icon;
  export const UilCog: Icon;
  export const UilEnvelope: Icon;
  export const UilKeyholeSquare: Icon;
  export const UilLock: Icon;
  export const UilPlay: Icon;
  export const UilRefresh: Icon;
  export const UilServer: Icon;
  export const UilServerAlt: Icon;
  export const UilServerNetwork: Icon;
  export const UilSetting: Icon;
  export const UilSpinner: Icon;
  export const UilSpinnerAlt: Icon;
  export const UilSync: Icon;
  export const UilTachometerFast: Icon;
  export const UilUnlock: Icon;
}
