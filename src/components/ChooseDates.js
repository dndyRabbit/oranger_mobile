import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import {COLORS, FONTS} from '../constants';

export default class ChooseDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
    this.props.setDate({
      ...this.props.date,
      ...dates,
    });
  };

  render() {
    const {startDate, endDate, displayedDate} = this.state;
    return (
      <View style={styles.container}>
        <DateRangePicker
          onChange={this.setDates}
          startDate={startDate}
          endDate={endDate}
          displayedDate={displayedDate}
          range>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primary,
              padding: 10,
              paddingHorizontal: 50,
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 5,
            }}>
            Pilih Tanggal...
          </Text>
        </DateRangePicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
});
