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

// Circular Back Arrow Icon
const BackArrowIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: 2,
        width: size * 0.45,
        height: size * 0.45,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// Field Icon: User (Full Name)
const UserFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.45,
        height: size * 0.45,
        borderRadius: (size * 0.45) / 2,
        borderWidth: 1.6,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.75,
        height: size * 0.36,
        borderTopLeftRadius: size * 0.36,
        borderTopRightRadius: size * 0.36,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
        marginTop: 1.5,
      }}
    />
  </View>
);

// Field Icon: Gender
const GenderFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ alignItems: 'center', marginRight: 2 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, borderWidth: 1.4, borderColor: color }} />
      <View style={{ width: 9, height: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3, borderWidth: 1.4, borderColor: color, borderBottomWidth: 0, marginTop: 1 }} />
    </View>
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, borderWidth: 1.4, borderColor: color }} />
      <View style={{ width: 9, height: 5, borderTopLeftRadius: 3, borderTopRightRadius: 3, borderWidth: 1.4, borderColor: color, borderBottomWidth: 0, marginTop: 1 }} />
    </View>
  </View>
);

// Field Icon: Calendar (DOB)
const CalendarFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.8,
      borderRadius: 3.5,
      borderWidth: 1.6,
      borderColor: color,
      paddingTop: 3,
      alignItems: 'center',
    }}
  >
    <View style={{ width: '100%', height: 1.4, backgroundColor: color }} />
    <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'space-around', width: '80%' }}>
      <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

// Field Icon: Phone (Mobile)
const PhoneFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.72,
      height: size * 0.72,
      borderWidth: 1.6,
      borderColor: color,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View style={{ width: size * 0.3, height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
  </View>
);

// Field Icon: Mail (Email)
const MailFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.82,
      height: size * 0.65,
      borderWidth: 1.6,
      borderColor: color,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}
  >
    <View
      style={{
        width: size * 0.45,
        height: size * 0.28,
        borderBottomWidth: 1.4,
        borderRightWidth: 1.4,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -1,
      }}
    />
  </View>
);

// Field Icon: City (Skyline)
const CityFieldIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size * 0.85, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
    <View style={{ width: 4.5, height: 8, borderWidth: 1.4, borderColor: color, borderBottomWidth: 0, marginRight: 1.5 }} />
    <View style={{ width: 5.5, height: 13, borderWidth: 1.4, borderColor: color, borderBottomWidth: 0, marginRight: 1.5 }} />
    <View style={{ width: 4.5, height: 9.5, borderWidth: 1.4, borderColor: color, borderBottomWidth: 0 }} />
  </View>
);

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
