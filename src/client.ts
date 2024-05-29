import { createClient } from '@dynamic-labs/client'
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension'

const environmentId = process.env.EXPO_PUBLIC_ENVIRONMENT_ID as string

if (!environmentId) {
  throw new Error('EXPO_PUBLIC_ENVIRONMENT_ID is required')
}

const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://app.dynamicauth.com/api/v0'

export const client = createClient({
  environmentId,
  appLogoUrl: 'https://demo.dynamic.xyz/favicon-32x32.png',
  appName: 'Dynamic Demo',
  apiBaseUrl,
}).extend(ReactNativeExtension())
