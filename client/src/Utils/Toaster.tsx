import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export const notifyUser = (message: string, isSuccess: boolean): void => {
    const toastOptions = {
        style: {
            background: '#171717', 
            color: 'white' 
        },
        errorStyle: {
            background: '#171717', 
            color: 'white' 
        }
    };

    if (isSuccess) {
        toast.success(message, {
            style: toastOptions.style
        });
    } else { 
        toast.error(message, {
            style: toastOptions.errorStyle
        });
    }
};

interface NotifyProps {
    message: string;
    isSuccess: boolean;
}

const Notify: React.FC<NotifyProps> = ({ message, isSuccess }) => {
    const handleClick = () => {
        notifyUser(message, isSuccess);
    };

    return (
        <div>
            <button onClick={handleClick}>Make me toast</button>
            <Toaster />
        </div>
    );
};

export default Notify;
