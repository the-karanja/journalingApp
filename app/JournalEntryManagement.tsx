import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const JournalEntryManagement = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/journal_entries');
      setEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      setError('Failed to fetch journal entries.');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      const payload = { title, content, category };

      if (editId) {
        await axios.put(`http://localhost:3000/journal_entries/${editId}`, payload, {
          withCredentials: true,
        });
      } else {
        await axios.post('http://localhost:3000/journal_entries', payload, {
          withCredentials: true,
        });
      }

      setTitle('');
      setContent('');
      setCategory('');
      setEditId(null);
      setError('');
      fetchEntries();
    } catch (error) {
      console.error('Error submitting journal entry:', error);
      setError('Failed to submit journal entry.');
    }
  };

  const handleEdit = (entry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setCategory(entry.category);
    setEditId(entry.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/journal_entries/${id}`, {
        withCredentials: true,
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      setError('Failed to delete journal entry.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />

      <Button title={editId ? 'Edit Entry' : 'Add Entry'} onPress={handleSubmit} />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>{item.category}</Text>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default JournalEntryManagement;
