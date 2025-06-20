import { useTheme } from '@/data/hooks/useTheme';
import { LoginModel, LoginSchema } from '@/data/models/LoginModel';
import authStyles from '@/styles/authStyles';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const router = useRouter();
    const { colors } = useTheme();
    const styles = authStyles(colors);
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const handleBack = () => router.back();

    const onSubmit = async (data: LoginModel) => {
        try {
            await login(data)
        } catch (error) {
            Alert.alert('Login failed')
        }
    };

    return (
        <View style={styles.authWrapper}>
            <View style={styles.authContainer}>
                <View style={styles.authBoxContainer}>
                    <Entypo
                        onPress={handleBack}
                        name="chevron-thin-left"
                        size={18}
                        color={colors.text}
                    />
                    <Text style={styles.headerText}>Login</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { value, onBlur, onChange } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        placeholderTextColor={'#535353'}
                                        placeholder="Enter your Email"
                                        style={styles.input}
                                    />
                                )}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { value, onBlur, onChange } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        placeholderTextColor={'#535353'}
                                        secureTextEntry
                                        placeholder="Enter your Password"
                                        style={styles.input}
                                    />
                                )}
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                        </View>
                        <TouchableOpacity
                            style={styles.authButton}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Link style={styles.linkText} href={'/register'}>
                        Register
                    </Link>
                </Text>
            </View>
        </View>
    );
};

export default Login;