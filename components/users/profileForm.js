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
  const [role, setRole] = useState(route.params.role);
  useEffect(() => {
    console.log('1');
    console.log(route.params.role);
    route.params.role.get().then(r => {
      console.log(r);
      console.log('eawea');
      setRole(r.data());
    });
  }, [route.params.role]);

  const [{ user }, dispatch] = useStateValue();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getRoles().onSnapshot(snap => {
      setRoles(snap.docs);
    });
  });
  const changeName = (event: any) => setName(event.nativeEvent.text);
  const changeMajor = (event: any) => setMajor(event.nativeEvent.text);
  const changeBio = (event: any) => setBio(event.nativeEvent.text);
  const changeYear = (event: any) => setGraduating(event.nativeEvent.data);
  const changeRole = (event: any) => setRole(event.nativeEvent.data);
  const changeBlocked = (event: any) => setBlocked(event.nativeEvent.data);

  async function updateProfile() {
    let newProf = {
      bio: bio,
      blocked: blocked,
      graduating: graduating,
      role: role,
      major: major,
      name: name,
    };

    return updateUserProfile(newProf, user).then(profile => {
      dispatch({
        type: 'viewUser',
        viewingUser: profile,
      });
      navigation.goBack();
    });
  }

  console.log(role);
  console.log(roles);

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
        <FormControl isRequired>
          <FormControl.Label>Role</FormControl.Label>
          <Select
            selectedValue={role}
            accessibilityLabel="Choose Role"
            placeholder="Choose Role"
            label={role.name}
            mt={1}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={itemValue => {
              console.log(itemValue);
              setRole(itemValue);
            }}>
            {roles.map(r => {
              return <Select.Item key={r.id} label={r.data().name} value={r.data()} />;
            })}
            {/*{() => {*/}
            {/*  let opts = [];*/}
            {/*  for (let r of roles) {*/}
            {/*    opts.push(*/}
            {/*      <Select.Item label={r.data.name} value={r.data.name} />*/}
            {/*    );*/}
            {/*  }*/}
            {/*  return opts;*/}
            {/*}}*/}
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in Bio.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button onPress={updateProfile}>Submit</Button>
      </Box>
    </VStack>
  );
};

export default ProfileForm;
