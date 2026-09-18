import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CalendarBadgeIcon,
} from '../../../../assets/icons/Icons';


// Helper to parse date string like "15 Aug 1998"
const parseDOBString = (dobStr) => {
  const fallback = { day: 15, month: 7, year: 1998 }; // default 15 Aug 1998
  if (!dobStr || typeof dobStr !== 'string') return fallback;

  const parts = dobStr.trim().split(/[\s-]+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10) || 15;
    const monthIndex = MONTH_SHORT.findIndex(
      (m) => m.toLowerCase() === parts[1].substring(0, 3).toLowerCase()
    );
    const month = monthIndex >= 0 ? monthIndex : 7;
    const year = parseInt(parts[2], 10) || 1998;
    return { day, month, year };
  }
  return fallback;
};

// Calculate age in years
const calculateAge = (day, month, year) => {
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - month;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age -= 1;
  }
  return age > 0 ? age : 0;
};

const EditDOB = ({
  visible = false,
  currentDOB = '15 Aug 1998',
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const parsed = parseDOBString(currentDOB);

  const [selectedDay, setSelectedDay] = useState(parsed.day);
  const [selectedMonth, setSelectedMonth] = useState(parsed.month);
  const [selectedYear, setSelectedYear] = useState(parsed.year);

  const [viewMonth, setViewMonth] = useState(parsed.month);
  const [viewYear, setViewYear] = useState(parsed.year);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Generate Year range (e.g. 1945 to current year - 10)
  const currentFullYear = new Date().getFullYear();
  const yearsList = [];
  for (let y = currentFullYear - 12; y >= 1945; y -= 1) {
    yearsList.push(y);
  }

  // Sync state when visible opens
  useEffect(() => {
    if (visible) {
      const p = parseDOBString(currentDOB);
      setSelectedDay(p.day);
      setSelectedMonth(p.month);
      setSelectedYear(p.year);
      setViewMonth(p.month);
      setViewYear(p.year);
      setIsYearPickerOpen(false);

      isClosing.current = false;
      panY.setValue(SCREEN_HEIGHT);
      Animated.spring(panY, {
        toValue: 0,
        damping: 24,
        mass: 0.85,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, currentDOB, panY]);

  const handleClose = (callback) => {
    if (isClosing.current) return;
    isClosing.current = true;
    Animated.timing(panY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback();
      } else {
        onClose?.();
      }
      isClosing.current = false;
    });
  };

  const handleSave = () => {
    const formattedDate = `${selectedDay} ${MONTH_SHORT[selectedMonth]} ${selectedYear}`;
    handleClose(() => {
      onSave?.(formattedDate);
    });
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Days in month calculation
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayWeekIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun

  const daysGrid = [];
  // Leading empty slots for preceding month days
  for (let i = 0; i < firstDayWeekIndex; i += 1) {
    daysGrid.push({ isEmpty: true, id: `empty-${i}` });
  }
  // Days of the active month
  for (let d = 1; d <= daysInCurrentMonth; d += 1) {
    daysGrid.push({ isEmpty: false, day: d, id: `day-${d}` });
  }
  // Trailing empty slots to make the last week exactly 7 columns
  while (daysGrid.length % 7 !== 0) {
    daysGrid.push({ isEmpty: true, id: `empty-trail-${daysGrid.length}` });
  }

  // Split into chunks of 7 days (exact rows) to guarantee 7 columns without flex wrapping errors
  const weeks = [];
  for (let i = 0; i < daysGrid.length; i += 7) {
    weeks.push(daysGrid.slice(i, i + 7));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 4 || Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        } else {
          panY.setValue(gestureState.dy * 0.1);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 60 || gestureState.vy > 0.35) {
          handleClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            bounciness: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const backdropOpacity = panY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5],
    outputRange: [0.45, 0],
    extrapolate: 'clamp',
  });

  const age = calculateAge(selectedDay, selectedMonth, selectedYear);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => handleClose()}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Dimmed Backdrop */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: COLORS.black,
                opacity: backdropOpacity,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet Card */}
        <Animated.View
          style={[
            styles.pdh20,
            styles.pdt8,
            {
              backgroundColor: COLORS.cardBg,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingBottom: Math.max(insets.bottom, 20) + 8,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 10,
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Drag Handle Bar */}
          <View
            {...panResponder.panHandlers}
            style={[
              styles.pdt8,
              styles.pdb12,
              {
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              },
            ]}
          >
            <View
              style={{
                width: 44,
                height: 4.5,
                borderRadius: 2.5,
                backgroundColor: COLORS.dragHandle,
              }}
            />
          </View>

          {/* Header Row: Title & Close Button */}
          <View
            style={[
              styles.mb8,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: COLORS.textDark,
              }}
            >
              Select Date of Birth
            </Text>

            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.closeBtnBg,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.7}
              onPress={() => handleClose()}
            >
              <CloseIcon size={12} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {/* Subtitle Caption */}
          <Text
            style={[
              styles.mb16,
              {
                fontSize: 12.5,
                color: COLORS.textMuted,
                lineHeight: 17,
              },
            ]}
          >
            Please choose your date of birth to verify your rider account
          </Text>

          {/* ================= CALENDAR HEADER BAR ================= */}
          <View
            style={[
              styles.mb12,
              styles.pdh8,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 42,
                backgroundColor: '#F8F6F0',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: COLORS.borderLight,
              },
            ]}
          >
            {/* Prev Month Button */}
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
              activeOpacity={0.7}
              onPress={handlePrevMonth}
            >
              <ChevronLeftIcon size={8} color={COLORS.textDark} />
            </TouchableOpacity>

            {/* Month & Year Title Dropdown Toggle */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setIsYearPickerOpen((prev) => !prev)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: isYearPickerOpen ? COLORS.yellowAccent : COLORS.white,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isYearPickerOpen ? COLORS.yellow : COLORS.borderLight,
              }}
            >
              <Text
                style={{
                  fontSize: 14.5,
                  fontWeight: '800',
                  color: COLORS.textDark,
                }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </Text>
              <ChevronDownIcon size={7} color={COLORS.textDark} />
            </TouchableOpacity>

            {/* Next Month Button */}
            <TouchableOpacity
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
              activeOpacity={0.7}
              onPress={handleNextMonth}
            >
              <ChevronRightIcon size={8} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {/* ================= YEAR & MONTH QUICK SELECTOR (CONDITIONAL) ================= */}
          {isYearPickerOpen ? (
            <View
              style={[
                styles.mb12,
                {
                  height: 240,
                  backgroundColor: '#FFFDF9',
                  borderRadius: 16,
                  borderWidth: 1.2,
                  borderColor: COLORS.yellowAccent,
                  padding: 10,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: COLORS.textMuted,
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Select Year
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center', paddingVertical: 4 }}
                style={{ maxHeight: 44 }}
              >
                {yearsList.map((yearItem) => {
                  const isCurYear = viewYear === yearItem;
                  return (
                    <TouchableOpacity
                      key={yearItem}
                      onPress={() => setViewYear(yearItem)}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        marginRight: 8,
                        borderRadius: 12,
                        backgroundColor: isCurYear ? COLORS.yellow : '#F1ECE1',
                        borderWidth: 1,
                        borderColor: isCurYear ? COLORS.yellowAccent : 'transparent',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13.5,
                          fontWeight: isCurYear ? '800' : '600',
                          color: COLORS.textDark,
                        }}
                      >
                        {yearItem}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: COLORS.textMuted,
                  marginTop: 10,
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Select Month
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {MONTH_SHORT.map((mShort, idx) => {
                  const isCurMonth = viewMonth === idx;
                  return (
                    <TouchableOpacity
                      key={mShort}
                      onPress={() => {
                        setViewMonth(idx);
                        setIsYearPickerOpen(false);
                      }}
                      style={{
                        width: '23%',
                        paddingVertical: 7,
                        marginBottom: 8,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isCurMonth ? COLORS.yellowAccent : '#F9F6EE',
                        borderWidth: 1,
                        borderColor: isCurMonth ? COLORS.yellow : '#EBE4D5',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12.5,
                          fontWeight: isCurMonth ? '800' : '600',
                          color: COLORS.textDark,
                        }}
                      >
                        {mShort}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : (
            /* ================= CALENDAR GRID ================= */
            <View
              style={[
                styles.mb12,
                styles.pdh8,
                styles.pdv8,
                {
                  backgroundColor: '#FFFFFF',
                  borderRadius: 18,
                  borderWidth: 1.2,
                  borderColor: COLORS.border,
                  shadowColor: COLORS.black,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 3,
                  elevation: 1,
                },
              ]}
            >
              {/* Weekdays Header (Exact 7 Columns using flex: 1) */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0EBE0',
                }}
              >
                {WEEK_DAYS.map((dayName, dIdx) => (
                  <View
                    key={dayName}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: dIdx === 0 ? '#E05A47' : COLORS.textMuted,
                      }}
                    >
                      {dayName}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Days Grid: Chunked into Exact 7-Item Rows (No subpixel wrapping) */}
              <View style={{ marginTop: 4 }}>
                {weeks.map((week, wIdx) => (
                  <View
                    key={`week-${wIdx}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 38,
                    }}
                  >
                    {week.map((item) => {
                      if (item.isEmpty) {
                        return (
                          <View
                            key={item.id}
                            style={{
                              flex: 1,
                              height: 38,
                            }}
                          />
                        );
                      }

                      const isSelected =
                        selectedDay === item.day &&
                        selectedMonth === viewMonth &&
                        selectedYear === viewYear;

                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.7}
                          onPress={() => {
                            setSelectedDay(item.day);
                            setSelectedMonth(viewMonth);
                            setSelectedYear(viewYear);
                          }}
                          style={{
                            flex: 1,
                            height: 38,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <View
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: isSelected ? COLORS.yellow : 'transparent',
                              borderWidth: isSelected ? 1.5 : 0,
                              borderColor: isSelected ? COLORS.yellowAccent : 'transparent',
                              shadowColor: isSelected ? COLORS.yellow : 'transparent',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: isSelected ? 0.35 : 0,
                              shadowRadius: 3,
                              elevation: isSelected ? 3 : 0,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13.5,
                                fontWeight: isSelected ? '800' : '600',
                                color: isSelected ? COLORS.textDark : '#2C2C2C',
                              }}
                            >
                              {item.day}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ================= SELECTED DATE SUMMARY CHIP ================= */}
          <View
            style={[
              styles.mb12,
              styles.pdh16,
              styles.pdv8,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAF7F0',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: '#EFE8DA',
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  backgroundColor: '#FFF2C6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <CalendarBadgeIcon size={16} color={COLORS.textDark} />
              </View>
              <View>
                <Text style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: '600' }}>
                  Selected Date
                </Text>
                <Text
                  style={{
                    fontSize: 14.5,
                    fontWeight: '800',
                    color: COLORS.textDark,
                  }}
                >
                  {selectedDay} {MONTH_NAMES[selectedMonth]} {selectedYear}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#EDE7D8',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 11.5, fontWeight: '700', color: COLORS.textDark }}>
                {age} Yrs
              </Text>
            </View>
          </View>

          {/* ================= SAVE / CONFIRM BUTTON ================= */}
          <TouchableOpacity
            style={[
              styles.mt4,
              {
                height: 50,
                borderRadius: 14,
                backgroundColor: COLORS.yellow,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: COLORS.yellow,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 3,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text
              style={{
                fontSize: 15.5,
                fontWeight: '800',
                color: COLORS.textDark,
              }}
            >
              Confirm Date of Birth
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditDOB;
