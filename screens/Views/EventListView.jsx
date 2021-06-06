import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda, CalendarList,Calendar } from 'react-native-calendars'
import { Dimensions } from 'react-native';
import { colorblue, colorGreen, colorOrange, colorRose, colorText, colorYello } from '../../constants/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { getAll } from 'react-native-contacts';


const EventListView = () => {
    const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
    return (
        <View style={{flex:1}}>
            <Calendar
                onDayPress={(day) => {console.log('selected day', day)}}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => (direction == 'left' ? <Icon name="chevron-left" color={colorText}/> : <Icon name="chevron-right" color={colorText}/>)}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                //   hideDayNames={true}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={false}
                // Disable right arrow. Default = false
                disableArrowRight={false}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter.
                //renderHeader={(date) => {/*Return JSX*/}}
                // Enable the option to swipe between months. Default = false
                
                enableSwipeMonths={true}
                
  
                
/>

        </View>
    )
}

export default EventListView

const styles = StyleSheet.create({})
