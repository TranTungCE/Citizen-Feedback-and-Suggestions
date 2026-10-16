import { z } from 'zod';

export const feedbackSubmissionSchema = z.object({
  title: z
    .string()
    .min(5, 'Tiêu đề cần tối thiểu 5 ký tự')
    .max(150, 'Tiêu đề không được vượt quá 150 ký tự'),
  category_id: z
    .string()
    .uuid('Vui lòng chọn lĩnh vực phù hợp')
    .or(z.string().min(1, 'Vui lòng chọn lĩnh vực')),
  location_text: z
    .string()
    .min(5, 'Vui lòng ghi rõ địa chỉ/khu vực xảy ra sự việc (ấp, tuyến đường...)')
    .max(255, 'Địa chỉ quá dài'),
  incident_at: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  content: z
    .string()
    .min(20, 'Nội dung phản ánh cần chi tiết (tối thiểu 20 ký tự)')
    .max(3000, 'Nội dung không vượt quá 3000 ký tự'),
  is_anonymous: z.boolean().default(false),
  submitter_name: z.string().max(100).optional(),
  submitter_phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal('')),
  submitter_email: z
    .string()
    .email('Địa chỉ email không hợp lệ')
    .optional()
    .or(z.literal('')),
  agree_privacy: z.boolean().refine((val) => val === true, {
    message: 'Bạn cần đồng ý với điều khoản bảo vệ dữ liệu và xử lý thông tin'
  }),
  honeypot: z.string().max(0, 'Spam detection').optional()
});

export type FeedbackSubmissionForm = z.infer<typeof feedbackSubmissionSchema>;

export const feedbackSearchSchema = z.object({
  tracking_code: z
    .string()
    .min(4, 'Mã tiếp nhận không hợp lệ')
    .max(30, 'Mã tiếp nhận quá dài')
    .transform((val) => val.trim().toUpperCase()),
  phone_or_email: z.string().optional()
});

export type FeedbackSearchForm = z.infer<typeof feedbackSearchSchema>;
