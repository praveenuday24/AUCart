import {
    useNotification
}
from "../context/NotificationContext";

const NotificationBell = () => {

    const {
        notifications
    } =
    useNotification();

    return (
        <div>
            🔔
            {
                notifications.length
            }
        </div>
    );
};

export default NotificationBell;