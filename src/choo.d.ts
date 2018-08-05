declare module 'choo/component' {
  export default abstract class Component {
    constructor(id?: string | number);
    render(...args: any[]): HTMLElement;
    rerender(): void;
    element: HTMLElement;
    abstract createElement(...args: any[]): HTMLElement;
    abstract update(...args: any[]): boolean;
    beforerender?(el: HTMLElement): void;
    load?(el: HTMLElement): void;
    unload?(el: HTMLElement): void;
    afterupdate?(el: HTMLElement): void;
    afterreorder?(el: HTMLElement): void;
  }
}
