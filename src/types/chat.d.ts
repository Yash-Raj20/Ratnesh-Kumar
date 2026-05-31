export { };

declare global {
    interface ChatWidget {
        init: (id: string) => void;
    }

    interface Window {
        Chat: ChatWidget;
    }
}
