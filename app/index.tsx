
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import welcomeStyles from '@/styles/welcomeStyles';
import { useRouter } from 'expo-router';


const Welcome: React.FunctionComponent = () => {

    const router = useRouter();
    const styles = welcomeStyles();

    const handleLogin = () => router.push('/login');
    const handleRegister = () => router.push('/register');

    return (
        <View style={styles.authContainer}>
            <View style={styles.separator}>
                <Text style={styles.headerText}>Welcome to LinkSave</Text>
                <Text style={styles.subHeaderText}>
                    Please login to your account or create{"\n"}
                    new account to continue
                </Text>
            </View>
            <View style={styles.separator}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcome
