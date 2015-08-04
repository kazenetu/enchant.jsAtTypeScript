declare class RfView {
    static Create(uiName: any, stage: any): RfView;
    static GetAssets(): any;
    static GetScreenWidth(): number;
    static GetScreenHeight(): number;
    ui: any;
}

declare module enchant {
    class Event{
        static RENDER: string;
        static TOUCH_END: string;
        static TOUCH_MOVE: string;
        static TOUCH_START: string;
    }
}

