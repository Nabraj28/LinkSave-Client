import { IconProps } from '@/types';
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const AddIcon = ({ size, color, focused }: IconProps) => {
    return (
        <View>
            {!focused &&
                <Svg width={size} height={size} viewBox="0 0 14 14">
                    <Path
                        fill={color}
                        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7ZM4.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7ZM8 4.5a.5.5 0 0 1 .5.5v2.5H11a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5V5a.5.5 0 0 1 .5-.5Z"
                    />
                </Svg>
            }
            {focused &&
                <Svg width={size} height={size} viewBox="0 0 14 14">
                    <Path
                        fill={color}
                        fillOpacity={0.67}
                        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7Zm6 0a.5.5 0 0 0-.5.5v2.5H5a.5.5 0 0 0 0 1h2.5V11a.5.5 0 0 0 1 0V8.5H11a.5.5 0 0 0 0-1H8.5V5a.5.5 0 0 0-.5-.5Z"
                    />
                </Svg>
            }
        </View>
    )

};
