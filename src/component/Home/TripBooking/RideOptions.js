import React from 'react';
import { View } from 'react-native';
import images from '../../../assets/images';
import styles from '../../../assets/styles';
import RideCard from './RideCard';

export const DEFAULT_VEHICLES = [
    {
        id: 'MINI',
        name: 'MINI',
        capacity: 4,
        price: 120,
        eta: '6 MIN',
        image: images.carMini,
    },
    {
        id: 'SEDAN',
        name: 'SEDAN',
        capacity: 4,
        price: 180,
        eta: '4 MIN',
        isPopular: true,
        image: images.carSedan,
    },
    {
        id: 'XL',
        name: 'XL',
        capacity: 6,
        price: 250,
        eta: '7 MIN',
        image: images.carXl,
    },
];

const RideOptions = ({
    vehicles = DEFAULT_VEHICLES,
    selectedVehicleId = 'SEDAN',
    onSelectVehicle,
}) => {
    return (
        <View
            style={[
                styles.pdh20,
                styles.mt16,
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
            ]}
        >
            {vehicles.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;

                return (
                    <RideCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        isSelected={isSelected}
                        onSelect={() => onSelectVehicle?.(vehicle.id)}
                    />
                );
            })}
        </View>
    );
};

export default RideOptions;
