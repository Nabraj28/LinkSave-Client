import { useAuth } from '@/context/AuthContext';
import settingsStyle from '@/styles/settingsStyle';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

const Settings = () => {

    const styles = settingsStyle();

    const { logout } = useAuth();
    const {theme, toggleTheme} = useTheme();

    const handleChangeTheme=(mode: string)=>{
        toggleTheme(mode);
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <View style={styles.settingsContainer}>
            <Text style={styles.headerText}>Settings</Text>
            <View>
                <Text style={styles.sectionLabel}>Theme</Text>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity 
                    onPress={()=>handleChangeTheme('light')} 
                    style={[styles.contentContainer, styles.firstItem, theme==='light' && styles.selectedTheme]}
                    >
                            <Text style={styles.contentText}>Light</Text>
                            <Ionicons name="sunny" size={22} style={styles.contentIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>handleChangeTheme('dark')} 
                    style={[styles.contentContainer, styles.borderItem, theme==='dark' && styles.selectedTheme]}
                    >
                            <Text style={styles.contentText}>Dark</Text>
                            <Ionicons name="moon-sharp" size={22} style={styles.contentIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.sectionLabel}>App Info</Text>
                <View style={styles.sectionContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentText}>Version</Text>
                        <Text style={styles.contentText}>V1</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={handleLogout}
                    style={[styles.contentContainer, styles.borderItem]}
                    >
                        <Text style={styles.contentText}>Logout</Text>
                        <MaterialIcons name="logout" size={22} style={styles.contentIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Settings;