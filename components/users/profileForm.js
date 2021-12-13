import React, { useEffect, useState } from 'react';
import onSnapshot from '@react-native-firebase/firestore';
import {
  Box,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  WarningOutlineIcon,
  Switch,
  Select,
  CheckIcon,
} from 'native-base';
import { useStateValue } from '../../store/store';
import { getRoles, updateUserProfile } from '../../api/user';
import firestore from '@react-native-firebase/firestore';

const ProfileForm = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.name);
  const [bio, setBio] = useState(route.params.bio);
  const [blocked, setBlocked] = useState(route.params.blocked);
  const [graduating, setGraduating] = useState(route.params.graduating);
  const [major, setMajor] = useState(route.params.major);
  const [{ user }, dispatch] = useStateValue();

  const changeName = (event: any) => setName(event.nativeEvent.text);
  const changeMajor = (event: any) => setMajor(event.nativeEvent.text);
  const changeBio = (event: any) => setBio(event.nativeEvent.text);
  const changeYear = (event: any) => setGraduating(event.nativeEvent.text);
  const changeBlocked = (event: any) => setBlocked(event.nativeEvent.data);

  async function updateProfile() {
    let newProf = {
      bio: bio,
      blocked: blocked,
      graduating: graduating,
      major: major,
      first: name,
    };

    return updateUserProfile(newProf, user, route.params.username).then(
      profile => {
        dispatch({
          type: 'viewUser',
          viewingUser: profile,
        });
        navigation.goBack();
      }
    );
  }

  return (
    <VStack width="90%" mx="3">
      <Text>Edit Profile</Text>
      <Box>
        <FormControl isRequired>
          <FormControl.Label>Name</FormControl.Label>
          <Input type="title" value={name} onChange={changeName} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in Name.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Major</FormControl.Label>
          <Input type="title" value={major} onChange={changeMajor} />
          <FormControl.HelperText>optional</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in Major.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Graduating Year</FormControl.Label>
          <Input type="title" value={graduating} onChange={changeYear} />
          <FormControl.HelperText>optional</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in Year.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Bio</FormControl.Label>
          <Input type="body" value={bio} onChange={changeBio} />
          <FormControl.HelperText>optional</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in Bio.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Blocked</FormControl.Label>
          <Switch value={blocked} onChange={changeBlocked} />
        </FormControl>
        <Button onPress={updateProfile}>Submit</Button>
      </Box>
    </VStack>
  );
};

export default ProfileForm;
