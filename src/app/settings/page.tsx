import { Metadata } from 'next';
import { SettingsClient } from './SettingsClient';

export const metadata: Metadata = {
  title: '設定 | CSS辞書',
  description: 'CSS辞書アプリの表示設定。ダークモード切り替え、表示オプションなどの設定を変更できます。',
  openGraph: {
    title: '設定 | CSS辞書',
    description: 'CSS辞書アプリの表示設定。ダークモード切り替え、表示オプションなどの設定を変更できます。',
    url: 'https://www.css-dictionary.com/settings',
  },
  twitter: {
    card: 'summary_large_image',
    title: '設定 | CSS辞書',
    description: 'CSS辞書アプリの表示設定。ダークモード切り替え、表示オプションなどの設定を変更できます。',
  },
};

export default function SettingsPage() {
  return <SettingsClient />;
}