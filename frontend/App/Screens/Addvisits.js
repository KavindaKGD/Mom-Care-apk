import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Animated,
  ScrollView,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CLINIC_BASE_URL } from '../config/api';

const backgroundImage = require('../../assets/Background.png');

const Addvisits = () => {
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Display helper for selected date (e.g., "23/09/2025")
  const displaySelectedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit', // change to 'short' for "23 Sep 2025"
        year: 'numeric',
      })
    : '';

  const toggleModal = () => {
    if (!isModalVisible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, speed: 12, bounciness: 8, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
        setModalVisible(false);
        slideAnim.setValue(50);
      });
    }
  };

  const showAlert = (message, success) => {
    setAlertMessage(message);
    setIsSuccess(success);
    toggleModal();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleTimeConfirm = (date) => {
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(formattedTime);
    hideTimePicker();
  };

  const saveVisitData = async () => {
    const visitData = { doctorName, clinicName, time, selectedDate, Notification: 'ME' };
    try {
      const response = await axios.post(`${CLINIC_BASE_URL}/visits`, visitData);
      console.log('Visit Data saved:', response.data);
      showAlert('Visit has been added successfully!', true);
      setDoctorName('');
      setClinicName('');
      setTime('');
      setSelectedDate('');
    } catch (error) {
      console.error('Error saving visit data:', error);
      showAlert('Failed to add visit. Please try again.', false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>MomCare</Text>
          </View>

          <Text style={styles.sectionTitle}>Add New Visit</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Doctor Name"
            value={doctorName}
            onChangeText={setDoctorName}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Clinic Name"
            value={clinicName}
            onChangeText={setClinicName}
          />

          <TouchableOpacity onPress={showTimePicker}>
            <TextInput style={styles.input} placeholder="Select Time" value={time} editable={false} />
          </TouchableOpacity>

          <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleTimeConfirm} onCancel={hideTimePicker} />

          <Text style={styles.label}>Date</Text>

          {/* Formatted selected date shown above the calendar */}
          {selectedDate ? (
            <Text style={styles.selectedDateText}>{displaySelectedDate}</Text>
          ) : null}

          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              // Format the month title shown at the top of the calendar
              // Examples: 'MMM yyyy' → "Sep 2025", 'MMMM yyyy' → "September 2025", 'MM/yyyy' → "09/2025"
              monthFormat={'MMM yyyy'}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#8e44ad' },
              }}
              style={styles.calendar}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                selectedDayBackgroundColor: '#8e44ad',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#8e44ad',
                arrowColor: '#8e44ad',
                monthTextColor: '#8e44ad',
              }}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={saveVisitData}>
            <Text style={styles.addButtonText}>Add New Visit</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} backdropOpacity={0.5}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={[styles.modalHeader, isSuccess ? styles.successHeader : styles.errorHeader]}>
              <AntDesign name={isSuccess ? 'checkcircleo' : 'closecircleo'} size={30} color="white" />
              <Text style={styles.modalHeaderText}>{isSuccess ? 'Success' : 'Error'}</Text>
            </View>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  scrollContent: { flexGrow: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: (RNStatusBar.currentHeight ?? 0) + 1,
  },
  title: {
    fontFamily: 'Appname',
    fontSize: 35,
    textAlign: 'center',
    color: '#A91E64',
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#fff2e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  selectedDateText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#8e44ad',
    textAlign: 'center',
  },
  calendarContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  calendar: { borderRadius: 10 },
  addButton: {
    backgroundColor: '#f0ad4e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 20,
  },
  modalHeader: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  successHeader: { backgroundColor: '#4CAF50' },
  errorHeader: { backgroundColor: '#F44336' },
  modalHeaderText: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  modalText: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#FFA07A',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  modalButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default Addvisits;
