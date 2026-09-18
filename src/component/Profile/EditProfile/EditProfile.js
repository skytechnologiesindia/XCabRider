import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../assets/colors';
import images from '../../../assets/images';
import ProfileInfoCard from './ProfileInfoCard';
import ProfileFieldList from './ProfileFieldList';
import SaveChangesButton from './SaveChangesButton';
import PrivacyNote from './PrivacyNote';
import EditName from './EditName/EditName';
import EditGender from './EditGender/EditGender';
import EditDOB from './EditDOB/EditDOB';
import EditEmail from './EditEmail/EditEmail';
import EditHomeCity from './EditHomeCity/EditHomeCity';

import {
  BackArrowIcon,
  UserFieldIcon,
  GenderFieldIcon,
  CalendarFieldIcon,
  PhoneFieldIcon,
  MailFieldIcon,
  CityFieldIcon,
} from '../../../assets/icons/Icons';


const EditProfile = ({
  navigation,
  onBack,
  onSave,
  userData = {
    fullName: 'Yasir Boss',
    phone: '+91 98••• 4821',
    email: 'yasir.boss@email.com',
    gender: 'Male',
    dob: '15 Aug 1998',
    city: 'Ranchi',
    rating: '4.9',
  },
}) => {
  const [profileData, setProfileData] = useState(userData);
  const [isEditNameVisible, setIsEditNameVisible] = useState(false);
  const [isEditGenderVisible, setIsEditGenderVisible] = useState(false);
  const [isEditDOBVisible, setIsEditDOBVisible] = useState(false);
  const [isEditEmailVisible, setIsEditEmailVisible] = useState(false);
  const [isEditHomeCityVisible, setIsEditHomeCityVisible] = useState(false);

  const nameParts = (profileData.fullName || 'Yasir Boss').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Yasir';
  const lastName = nameParts.slice(1).join(' ') || 'Boss';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Profile');
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(profileData);
    }
    handleBack();
  };

  const fields = [
    {
      id: 'name',
      label: 'Full Name',
      value: profileData.fullName,
      icon: (color) => <UserFieldIcon size={18} color={color} />,
    },
    {
      id: 'gender',
      label: 'Gender',
      value: profileData.gender,
      icon: (color) => <GenderFieldIcon size={18} color={color} />,
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      value: profileData.dob,
      icon: (color) => <CalendarFieldIcon size={18} color={color} />,
    },
    {
      id: 'phone',
      label: 'Mobile Number',
      value: profileData.phone,
      isVerified: true,
      isFixed: true,
      icon: (color) => <PhoneFieldIcon size={18} color={color} />,
    },
    {
      id: 'email',
      label: 'Email Address',
      value: profileData.email,
      icon: (color) => <MailFieldIcon size={18} color={color} />,
    },
    {
      id: 'city',
      label: 'Home City',
      value: profileData.city,
      icon: (color) => <CityFieldIcon size={18} color={color} />,
    },
  ];

  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets?.top || 0,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    12,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: topInset,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ================= IN-PAGE SECTION HEADER ================= */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: COLORS.white,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}
          activeOpacity={0.7}
          onPress={handleBack}
        >
          <BackArrowIcon size={16} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: COLORS.textDark,
            letterSpacing: -0.3,
          }}
        >
          Edit Profile
        </Text>
      </View>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 6,
          paddingBottom: 24,
        }}
      >
        {/* ================= PROFILE INFO CARD ================= */}
        <ProfileInfoCard
          fullName={profileData.fullName}
          phone={profileData.phone}
          rating={profileData.rating}
          avatarSource={images.avatar}
          onCameraPress={() => {}}
        />

        {/* ================= FORM FIELDS LIST ================= */}
        <ProfileFieldList
          fields={fields}
          onFieldPress={(field) => {
            if (field.id === 'name') {
              setIsEditNameVisible(true);
            } else if (field.id === 'gender') {
              setIsEditGenderVisible(true);
            } else if (field.id === 'dob') {
              setIsEditDOBVisible(true);
            } else if (field.id === 'email') {
              setIsEditEmailVisible(true);
            } else if (field.id === 'city') {
              setIsEditHomeCityVisible(true);
            }
          }}
        />

        {/* ================= SAVE CHANGES BUTTON ================= */}
        <SaveChangesButton
          title="Save Changes"
          onPress={handleSave}
        />

        {/* ================= PRIVACY NOTE ================= */}
        <PrivacyNote />
      </ScrollView>

      {/* ================= EDIT NAME BOTTOM SHEET MODAL ================= */}
      <EditName
        visible={isEditNameVisible}
        initialFirstName={firstName}
        initialLastName={lastName}
        onClose={() => setIsEditNameVisible(false)}
        onSave={({ fullName }) => {
          setProfileData(prev => ({
            ...prev,
            fullName: fullName || prev.fullName,
          }));
          setIsEditNameVisible(false);
        }}
      />

      {/* ================= EDIT GENDER BOTTOM SHEET MODAL ================= */}
      <EditGender
        visible={isEditGenderVisible}
        currentGender={profileData.gender}
        onClose={() => setIsEditGenderVisible(false)}
        onSave={(newGender) => {
          setProfileData(prev => ({
            ...prev,
            gender: newGender,
          }));
          setIsEditGenderVisible(false);
        }}
      />

      {/* ================= EDIT DOB BOTTOM SHEET MODAL ================= */}
      <EditDOB
        visible={isEditDOBVisible}
        currentDOB={profileData.dob}
        onClose={() => setIsEditDOBVisible(false)}
        onSave={(newDOB) => {
          setProfileData(prev => ({
            ...prev,
            dob: newDOB,
          }));
          setIsEditDOBVisible(false);
        }}
      />

      {/* ================= EDIT EMAIL BOTTOM SHEET MODAL ================= */}
      <EditEmail
        visible={isEditEmailVisible}
        currentEmail={profileData.email}
        onClose={() => setIsEditEmailVisible(false)}
        onSave={(newEmail) => {
          setProfileData(prev => ({
            ...prev,
            email: newEmail,
          }));
          setIsEditEmailVisible(false);
        }}
      />

      {/* ================= EDIT HOME CITY BOTTOM SHEET MODAL ================= */}
      <EditHomeCity
        visible={isEditHomeCityVisible}
        currentCity={profileData.city}
        onClose={() => setIsEditHomeCityVisible(false)}
        onSave={(newCity) => {
          setProfileData(prev => ({
            ...prev,
            city: newCity,
          }));
          setIsEditHomeCityVisible(false);
        }}
      />
    </View>
  );
};

export { EditProfile };
export default EditProfile;
