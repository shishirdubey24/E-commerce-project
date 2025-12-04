import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Save,
  Upload,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  Plus,
  Download,
  Palette,
  Globe,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Settings
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Manage your admin panel preferences
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">Settings saved successfully!</p>
            <p className="text-xs text-green-700">Your changes have been applied.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-6">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">General Settings</h2>
                  <p className="text-sm text-gray-500">Manage your store basic information</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name
                    </label>
                    <input
                      type="text"
                      defaultValue="ShopAdmin Store"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@shopadmin.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 9876543210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Address
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="123 Main Street, Mumbai, Maharashtra, India"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option>Asia/Kolkata (IST)</option>
                      <option>Asia/Dubai (GST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                  <p className="text-sm text-gray-500">Update your personal information</p>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      A
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
                      <Upload className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Admin User</h3>
                    <p className="text-sm text-gray-500">admin@shopadmin.com</p>
                    <button className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="User"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@shopadmin.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 9876543210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your account security</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Two-Factor Authentication</p>
                    <p className="text-xs text-blue-700 mt-1">Add an extra layer of security to your account</p>
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Enable 2FA →
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Chrome on Windows</p>
                          <p className="text-xs text-gray-500">Mumbai, India • Active now</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Current
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
                  <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', description: 'Receive email updates about your account' },
                    { label: 'Order Updates', description: 'Get notified about new orders' },
                    { label: 'Customer Messages', description: 'Receive customer inquiries and messages' },
                    { label: 'Low Stock Alerts', description: 'Get alerts when products are running low' },
                    { label: 'Weekly Reports', description: 'Receive weekly performance reports' },
                    { label: 'Marketing Updates', description: 'Promotional and marketing notifications' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Appearance Settings</h2>
                  <p className="text-sm text-gray-500">Customize the look and feel</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Light', color: 'bg-white', border: 'border-2' },
                      { name: 'Dark', color: 'bg-gray-900', border: '' },
                      { name: 'Auto', color: 'bg-linear-to-br from-white to-gray-900', border: '' },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={`p-4 rounded-lg border-2 hover:border-emerald-500 transition-all ${
                          theme.name === 'Light' ? 'border-emerald-500' : 'border-gray-200'
                        }`}
                      >
                        <div className={`w-full h-20 rounded-lg mb-2 ${theme.color} ${theme.border} border-gray-200`}></div>
                        <p className="text-sm font-medium text-gray-900">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Primary Color
                  </label>
                  <div className="grid grid-cols-6 gap-3">
                    {['#10b981', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className="w-full aspect-square rounded-lg hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Small</option>
                    <option>Medium (Default)</option>
                    <option>Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sidebar Position
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing & Plans</h2>
                  <p className="text-sm text-gray-500">Manage your subscription and billing</p>
                </div>

                <div className="p-6 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Pro Plan</h3>
                      <p className="text-sm text-gray-600">Active subscription</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold">
                      ₹2,999/mo
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Next billing date: Jan 15, 2025</p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      Upgrade Plan →
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        Default
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    <Plus className="w-4 h-4" />
                    Add Payment Method
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'Dec 15, 2024', amount: '₹2,999', status: 'Paid' },
                      { date: 'Nov 15, 2024', amount: '₹2,999', status: 'Paid' },
                      { date: 'Oct 15, 2024', amount: '₹2,999', status: 'Paid' },
                    ].map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                          <p className="text-xs text-gray-500">Pro Plan Subscription</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-semibold text-gray-900">{invoice.amount}</p>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {invoice.status}
                          </span>
                          <button className="text-emerald-600 hover:text-emerald-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
