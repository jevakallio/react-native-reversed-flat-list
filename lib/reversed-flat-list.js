import React from 'react';
import { FlatList, View, ScrollView, StyleSheet } from 'react-native';

/**
 * A FlatList that is rendered in reverse.
 * Useful for chats and whatnots
 */
export default class ReversedList extends React.Component {
  constructor(props) {
    super(props);
    this._previousData = props.data;
    this.state = {
      data: [...props.data].reverse()
    };
  }

  // when provided data array changes,
  // update the internal reversed copy
  componentWillReceiveProps({ data }) {
    if (data !== this._previousData) {
      this._previousData = data;
      this.setState({ data: [...data].reverse() });
    }
  }

  scrollToBottom() {
    this.scrollToIndex({ index: 0 });
  }

  scrollToIndex(...args) {
    if (this._listViewRef) {
      this._listViewRef.scrollToIndex(...args);
    }
  }

  // then backing scrollview is flipped to reverse the list
  renderScrollComponent = ({ style, refreshing, ...props }) => (
    <ScrollView style={[style, styles.flip]} {...props} />
  );

  // each row is flipped back to normal position
  renderItem = props => (
    <View style={styles.flip}>
      {this.props.renderItem(props)}
    </View>
  );

  render() {
    const { renderItem, data, ...props } = this.props;
    return (
      <FlatList
        {...props}
        data={this.state.data}
        renderItem={this.renderItem}
        renderScrollComponent={this.renderScrollComponent}
        ref={ref => (this._listViewRef = ref)}
      />
    );
  }
}

// flipping is done by scale transform
const styles = StyleSheet.create({
  flip: {
    transform: [{ scaleY: -1 }]
  }
});
