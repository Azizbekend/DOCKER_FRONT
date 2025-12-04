// interface BaseMessage {
//     command_type: string;
//     user_id: number;
// }

// interface SubscriptionMessage extends BaseMessage {
//     command_type: 'subscribe';
//     paths: string[];
// }

// interface UnsubscribeMessage extends BaseMessage {
//     command_type: 'unsubscribe';
//     paths: string[];
// }

// interface IncomingMessage {
//     guid: string;
//     path: string;
//     data: string;
//     timestamp: number;
// }

// type EventHandler = (data: any) => void;

