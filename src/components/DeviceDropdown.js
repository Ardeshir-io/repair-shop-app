import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

export default function DeviceDropdown({value, onSelect, categories}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Input نمایشی */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}>
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || 'نوع دستگاه'}
        </Text>

        <Icon name="chevron-down" size={20} color="#999" />
      </TouchableOpacity>

      {/* Dropdown */}
      <Modal transparent animationType="fade" visible={visible}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modal}>
            {categories.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 30,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    color: '#212121',
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row-reverse', // مهم برای RTL
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownText: {
    color: '#555',
    fontSize: 14,
  },

  placeholder: {
    color: '#999',
  },
});
