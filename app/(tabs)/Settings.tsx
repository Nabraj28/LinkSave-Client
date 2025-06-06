import { useAuth } from '@/context/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <View>
            <Text>Settings</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;