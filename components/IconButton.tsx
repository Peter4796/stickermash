import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
    icon: keyof typeof MaterialIcons.glyphMap
    label: string
    onPress: () => void
}
const IconButton: FC<Props> = ({ icon, label, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.iconButton}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
});