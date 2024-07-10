// components/JournalScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddEntry = () => {
    const newEntry = { title, content, category, date };
    if (isEditing) {
      const updatedEntries = [...entries];
      updatedEntries[currentIndex] = newEntry;
      setEntries(updatedEntries);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }
    setTitle('');
    setContent('');
    setCategory('');
    setDate('');
  };

  const handleEditEntry = (index) => {
    const entry = entries[index];
    setTitle(entry.title);
    setContent(entry.content);
    setCategory(entry.category);
    setDate(entry.date);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journal Entry Management</Text>
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
      <Button
        title={isEditing ? "Update Entry" : "Add Entry"}
        onPress={handleAddEntry}
      />
      <FlatList
        data={entries}
        renderItem={({ item, index }) => (
          <View style={styles.entry}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>{item.category}</Text>
            <Text>{item.date}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEditEntry(index)} />
              <Button title="Delete" onPress={() => handleDeleteEntry(index)} />
            </View>
          </View>
        )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default JournalScreen;
