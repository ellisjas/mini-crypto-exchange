import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import ArrowRight from '../../assets/images/ArrowRight.svg';

type RootStackParamList = {
  Accounts: undefined;
  CryptoDetail: {
    symbol: string;
    name: string;
  };
  Settings: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

type Props = {
  icon?: React.ReactElement;
  label: string;
  value: React.ReactNode;
  sublabel?: string;
  subvalue?: React.ReactNode;
  navigateTo?: keyof RootStackParamList;
  params?: Record<string, unknown>;
};

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #e5e5e5;
`;

const LeftContent = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.View`
  margin-right: 12px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const LabelContainer = styled.View`
  justify-content: center;
`;

const Label = styled.Text<{ error?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: '#1A1A1A';
`;

const Sublabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ValueContainer = styled.View`
  align-items: flex-end;
  margin-right: 8px;
`;

const Value = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
`;

const Subvalue = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

const TouchableWrapper = styled.Pressable`
  width: 100%;
`;

function ListItem({
  icon,
  label,
  value,
  sublabel,
  subvalue,
  navigateTo,
  params,
}: Props) {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo, params as never);
    }
  };

  return (
    <TouchableWrapper onPress={handlePress}>
      <Container>
        <LeftContent>
          {icon && <IconContainer>{icon}</IconContainer>}
          <LabelContainer>
            <Label>{label}</Label>
            {sublabel && <Sublabel>{sublabel}</Sublabel>}
          </LabelContainer>
        </LeftContent>

        <RightContent>
          <ValueContainer>
            <Value>{value}</Value>
            {subvalue && <Subvalue>{subvalue}</Subvalue>}
          </ValueContainer>
          {navigateTo && <ArrowRight />}
        </RightContent>
      </Container>
    </TouchableWrapper>
  );
}

export default ListItem;
