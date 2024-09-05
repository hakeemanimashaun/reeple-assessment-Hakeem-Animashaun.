// currency converter screen allows you enter amount to convert and chose conversion currencies

import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import CustomPicker from '@/components/CustomPicker';
import { ThemedTextInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useAppContext } from '@/storage/ContextProvider';
import { fetchExchangeRate } from '@/api/currencyApi';

const App: React.FC = () => {
  const {
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    amount,
    setAmount,
    convertedAmount,
    setConvertedAmount,
    exchangeRate,
    setExchangeRate,
    error,
    setError,
    rates,
    setRates,
  } = useAppContext();

  useEffect(() => {
    if (sourceCurrency && targetCurrency) {
      const fetchRates = async () => {
        try {
          const { rates: fetchedRates, rate } = await fetchExchangeRate(sourceCurrency, targetCurrency);
          setRates(fetchedRates);
          setExchangeRate(rate);
          setError('');
        } catch (err) {
          setError((err as Error).message);
        }
      };
      fetchRates();
    }
  }, [sourceCurrency, targetCurrency]);

  useEffect(() => {
   
    if (exchangeRate && amount) {
      setConvertedAmount((parseFloat(amount) * exchangeRate).toFixed(2));
    } else {
      setConvertedAmount('');
    }
  }, [exchangeRate, amount]);

  const handleConversion = (amount: string) => {
    setAmount(amount);
  };

  const currencies = [
    'USD', 'EUR', 'GBP', 'CAD', 'NGN', 'JPY', 'AUD', 'CNY', 'INR', 'ZAR',
  ];

  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Currency Converter
      </ThemedText>
      {error ? (
        <ThemedText type="default" style={styles.error}>
          {error}
        </ThemedText>
      ) : null}

      <ThemedTextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleConversion}
      />

      <CustomPicker
        label="From"
        options={currencies}
        selectedValue={sourceCurrency}
        onValueChange={setSourceCurrency}
      />

      <CustomPicker
        label="To"
        options={currencies}
        selectedValue={targetCurrency}
        onValueChange={setTargetCurrency}
      />

      <ThemedText style={styles.result}>
        {amount && exchangeRate
          ? `${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`
          : 'Enter an amount to convert'}
      </ThemedText>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
