
import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import authStyles from '@/styles/authStyles';
import { useTheme } from '@/data/hooks/Theme/useTheme';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterModel, RegisterSchema } from '@/data/models/RegisterModel';
import { useAuth } from '@/context/AuthContext';
import Entypo from '@expo/vector-icons/Entypo';

const Register: React.FunctionComponent = () => {

    const { colors } = useTheme();
    const styles = authStyles();

    const router = useRouter();

    const { register, authState } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema),
    });

    const handleBack = () => router.back();

    const onSubmit = (data: RegisterModel) => {
        register(data)
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
                    <Text style={styles.headerText}>Register</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field: { value, onBlur, onChange } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        placeholderTextColor={'#535353'}
                                        placeholder="Enter your Username"
                                        style={styles.input}
                                    />
                                )}
                            />
                            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                        </View>
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
                            <Text style={styles.buttonText}>
                                {authState.isLoading ? <ActivityIndicator color='white' /> : 'Register'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.footerText}>
                    Already have an account?
                    <Link style={styles.linkText} href={'/login'}>
                        Login
                    </Link>
                </Text>
            </View>
        </View>
    );
};

export default Register;