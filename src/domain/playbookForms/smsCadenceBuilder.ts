import { PlaybookForm } from '../entities/PlaybookForm';

export const smsCadenceBuilder: PlaybookForm = {
  name: 'SMS Cadence Builder',
  blocks: [
    {
      name: 'Key Campaign Information',
      fields: [
        {
          label: 'Company Name',
          name: 'company_name',
          type: 'text',
        },
        {
          label: 'Campaign Category',
          name: 'campaign_category',
          type: 'text',
        },
        {
          label: 'Campaign Website Url',
          name: 'campaign_website_url',
          type: 'text',
        },
        {
          label: 'Campaign Objective',
          name: 'campaign_objective',
          type: 'select',
          options: [
            { label: 'Text', default: true },
            {
              label: 'Call-Objective',
            },
            {
              label: 'Click-Objective-PermissionBased',
            },
            {
              label: 'Click-Objective-DirectSend',
            },
          ],
        },
        {
          label: 'Click-Objective-Goal',
          name: 'campaign_click_objective',
          type: 'select',
          options: [
            { label: 'Text', default: true },
            {
              label: 'Learn More',
            },
            {
              label: 'Sign Up',
            },
            {
              label: 'Buy Now',
            },
            {
              label: 'Register',
            },
            {
              label:
                'Complete or Finish Purchase (Must mention Complete or Finish)',
            },
            {
              label:
                'Complete or Finish Sign-Up  (Must mention Complete or Finish)',
            },
            {
              label: 'Get Link To This Offer',
            },
          ],
        },
        {
          label: 'Business Hours',
          name: 'campaign_business_hours',
          type: 'text',
          placeholder:
            'I.e.Monday to Friday, 8am - 6pm, PST, Ignore for click campaign',
        },
        {
          label: 'Company Prefers to call their call reps',
          name: 'campaign_rep_title',
          type: 'text',
          defaultValue: 'rep',
          placeholder:
            'I.e. consultant, advisor, sales rep, experts, agents, Ignore for click campaign',
        },
      ],
    },
    {
      name: 'Campaign Highlights',
      fields: [
        {
          label: 'Promotions',
          name: 'highlight_promotion_01',
          type: 'text',
          placeholder: 'I.e. Existing Promotions/Discount/Limited Time Offers',
        },
        {
          label: 'Key Selling Points 1',
          name: 'highlight_key_selling_point_01',
          type: 'text',
        },
        {
          label: 'Key Selling Points 2',
          name: 'highlight_key_selling_point_02',
          type: 'text',
        },
        {
          label: 'Trust Building Statements 1',
          name: 'highlight_trust_building_statement_01',
          type: 'text',
        },
        {
          label: 'Trust Building Statements 2',
          name: 'highlight_trust_building_statement_02',
          type: 'text',
        },
      ],
    },
    {
      name: 'Campaign Content Negatives',
      fields: [
        {
          label: 'Always change',
          name: 'content_negatives',
          type: 'text',
        },
        {
          label: 'to Any of the following Phrases',
          name: 'content_negatives_replacement',
          type: 'text',
        },
        {
          label: 'Do not ever say',
          name: 'do_not_ever_say_words',
          type: 'text',
        },
      ],
    },
    {
      name: 'Formatting & Output Options',
      fields: [
        {
          label: 'Number of messages per version',
          name: 'number_msgs_per_day',
          type: 'select',
          options: [
            { label: 1, default: true },
            { label: 2 },
            { label: 3 },
            { label: 4 },
          ],
        },
        {
          label: 'Number of Days',
          name: 'number_days',
          type: 'number',
          defaultValue: 15,
        },
        {
          label: 'Export Format',
          name: 'export_format',
          type: 'radio',
          options: [{ label: 'Regular Text', default: true }, { label: 'CSV' }],
        },
        {
          label: 'Language',
          name: 'export_language',
          type: 'select',
          options: [
            { label: 'English', default: true },
            { label: 'Mandarin Traditional Chinese (繁體字）' },
            { label: 'Spanish' },
          ],
        },
      ],
    },
  ],
};
