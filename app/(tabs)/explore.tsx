// currency conversion list shows all current conversion rates in real time

import React, { memo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from '@/storage/ContextProvider';

const RateItem = memo(({ item }: { item: { code: string; rate: number } }) => (
  <View style={styles.rateItem}>
    <Text style={styles.currencyCode}>{item.code}</Text>
    <Text style={styles.currencyRate}>{item.rate}</Text>
  </View>
));

const App = () => {
  const { rates, error } = useAppContext(); 

  const renderRateItem = ({ item }: { item: { code: string; rate: number } }) => (
    <RateItem item={item} />
  );

  const getItemLayout = (data: any, index: number) => ({
    length: 50, 
    offset: 50 * index, 
    index,
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Currency Rate List
      </ThemedText>
      {error ? (
        <ThemedText type="default" style={styles.error}>
          {error}
        </ThemedText>
      ) : (
        <FlatList
          data={Object.keys(rates).map((key) => ({ code: key, rate: rates[key] }))}
          keyExtractor={(item) => item.code}
          renderItem={renderRateItem}
          style={styles.list}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    
  },
  list: {
    width: '100%',
    marginTop: 10,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  currencyCode: {
    fontSize: 18,
  },
  currencyRate: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
