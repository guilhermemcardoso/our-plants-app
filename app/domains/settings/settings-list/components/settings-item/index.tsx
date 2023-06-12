import React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import Text from '~/shared/components/text';
import styles from './styles';
import { HStack, Slider, Switch, VStack, useTheme } from 'native-base';
import { formatDistance } from '~/shared/utils/distance';

type Props = ViewProps & {
  title: string;
  value?: boolean | number;
  onPress?: () => void;
  pressable?: boolean;
  setValue?: (value: boolean | number) => void;
  type: 'default' | 'switch' | 'slider';
};
const SettingsItem = ({
  title,
  value,
  type,
  pressable = false,
  onPress,
  setValue,
}: Props) => {
  const [sliderValue, setSliderValue] = React.useState(value as number);
  const theme = useTheme();

  const getRightComponent = () => {
    if (value !== undefined && type === 'switch') {
      return (
        <Switch
          onTrackColor="primary.pure"
          value={value as boolean}
          onToggle={setValue}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      disabled={!pressable}
      onPress={onPress}
      style={styles.container}
    >
      {type === 'slider' ? (
        <VStack flex={1}>
          <Text style={styles.sliderLabel}>{title}</Text>
          <HStack flex={1}>
            <Slider
              flex={1}
              step={50}
              minValue={100}
              maxValue={20000}
              style={styles.slider}
              defaultValue={value as number}
              onChange={(v) => {
                setSliderValue(Math.floor(v));
              }}
              onChangeEnd={(v) => {
                v && setValue && setValue(Math.floor(v));
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack bgColor={theme.colors.primary.pure} />
              </Slider.Track>
              <Slider.Thumb bgColor={theme.colors.primary.pure} />
            </Slider>
            <Text style={styles.sliderValue}>
              {formatDistance(sliderValue)}
            </Text>
          </HStack>
        </VStack>
      ) : (
        <Text>{title}</Text>
      )}
      {getRightComponent()}
    </TouchableOpacity>
  );
};

export default SettingsItem;
