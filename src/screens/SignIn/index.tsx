import React, { useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignSocialButton } from '../../components/SignSocialButton';
import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Não foi possivel conectar com a conta Google',
        visibilityTime: 2000,
        bottomOffset: 100,
      });
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    setIsLoading(true);
    try {
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Não foi possivel conectar com a conta Apple',
        visibilityTime: 2000,
        bottomOffset: 100,
      });
      setIsLoading(false);
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </S.FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="small"
            style={{ marginTop: 18 }}
          />
        )}
      </S.Footer>
    </S.Container>
  );
}
