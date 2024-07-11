// components/JournalEntryScreen.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const JournalEntryScreen = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const addEntry = () => {
    setEntries([...entries, { title, content, category, date }]);
    setTitle('');
    setContent('');
    setCategory('');
    setDate('');
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.entry}>
      <Text style={styles.entryText}>Title: {item.title}</Text>
      <Text style={styles.entryText}>Content: {item.content}</Text>
      <Text style={styles.entryText}>Category: {item.category}</Text>
      <Text style={styles.entryText}>Date: {item.date}</Text>
      <TouchableOpacity onPress={() => deleteEntry(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Entry" onPress={addEntry} />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  entry: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  entryText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default JournalEntryScreen;
