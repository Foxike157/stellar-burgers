import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FeedInfoUI> = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof FeedInfoUI>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 12,
      totalToday: 2
    },
    readyOrders: [123, 124, 125, 126, 127],
    pendingOrders: [128, 129, 130]
  }
};
