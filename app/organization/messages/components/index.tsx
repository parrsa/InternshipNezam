"use client"
import { Button } from '@/app/components/ui/Button';
import { TextArea } from '@/app/components/ui/input';
import { cn } from '@/lib/cn';
import { Building2, Plus, Send } from 'lucide-react';
import { useState } from 'react';


const MESSAGES = [
  {
    id: 1,
    sender: 'مهندس رضایی',
    subject: 'تأیید گزارش مرداد',
    date: '۱۴۰۴/۰۵/۱۰',
    unread: true,
    title: 'تأیید گزارش مرداد',
    body: 'با سلام، گزارش شما برای دوره مرداد تأیید شد. لطفاً گزارش خرداد را با تأکید بر ساعت فنی کارگاه تکمیل کنید. همچنین در جلسه توجیحی ۱۴۰۴/۰۶/۰۵ شرکت حضوری داشته باشید.',
    quoteLabel: 'قسمت تأیید شده:',
    quoteValue: '۱۶۸ ساعت — وضعیت: تأیید شده',
  },
  {
    id: 2,
    sender: 'اداره کارآموزی',
    subject: 'فراخوان جلسه توجیحی',
    date: '۱۴۰۴/۰۵/۰۸',
    unread: true,
    title: 'فراخوان جلسه توجیحی',
    body: 'با سلام، جلسه توجیحی کارآموزان در تاریخ اعلام‌شده برگزار می‌شود. حضور همه کارآموزان الزامی است.',
  },
  {
    id: 3,
    sender: 'مهندس احمدی',
    subject: 'تسویه حساب دوره',
    date: '۱۴۰۴/۰۵/۰۵',
    unread: false,
    title: 'تسویه حساب دوره',
    body: 'با سلام، لطفاً مدارک مربوط به تسویه حساب دوره را تا پایان هفته ارسال کنید.',
  },
  {
    id: 4,
    sender: 'اداره فنی',
    subject: 'بازدید فنی — پروژه پارسیان',
    date: '۱۴۰۴/۰۵/۰۲',
    unread: false,
    title: 'بازدید فنی — پروژه پارسیان',
    body: 'با سلام، بازدید فنی از پروژه پارسیان طبق برنامه انجام خواهد شد. لطفاً هماهنگی‌های لازم را انجام دهید.',
  },
  {
    id: 5,
    sender: 'سازمان نظام مهندسی',
    subject: 'تغییر ساعت کاری',
    date: '۱۴۰۴/۰۴/۲۸',
    unread: true,
    title: 'تغییر ساعت کاری',
    body: 'با سلام، ساعت کاری دفاتر سازمان از هفته آینده تغییر می‌کند. جزئیات در اطلاعیه پیوست آمده است.',
  },
];


const card = 'sm:h-[650px] rounded-xl border border-neutral-200 bg-white shadow-sm';

export default function MessageInbox() {
  const [activeId, setActiveId] = useState(1);
  const [reply, setReply] = useState('');
  const active = MESSAGES.find((m) => m.id === activeId) ?? MESSAGES[0];

  const handleSelect = (id: number) => {
    setActiveId(id);
    setReply('');
  };

  const handleSendReply = () => {
    const text = reply.trim();
    if (!text) return;
    setReply('');
  };

  return (
    <div
      dir="rtl"
      className=" pt-1 w-full text-[#111827]"
    >
      <div className="mx-auto flex sm:flex sm:flex-row flex-col  items-center sm:items-start gap-4 w-full ">
        <div className={`${card} sm:w-[35%]  w-full px-3.75 pb-3.75 pt-10`}>

          <Button
            variant="solid"
            color="input"
            size='xs'
            rounded="lg"
            leftIcon={<Plus size={19} />}
            textSize="sm"
            className={cn(
              " w-full mb-5 "
            )}
          >
            <p> پیام جدید</p>
          </Button>

          <ul className=" flex list-none flex-col gap-1.5">
            {MESSAGES.map((m) => (
              <li
                key={m.id}
                onClick={() => handleSelect(m.id)}
                className={`relative flex  cursor-pointer flex-col gap-0.75 rounded-xl px-2.75 pt-1.75  py-2 text-right ${m.id === activeId ? 'bg-[#e7eaf6]' : ''
                  }`}
              >
                <span className="text-xs font-bold leading-5 text-[#111827]">{m.sender}</span>
                <span className="text-2xs leading-5 text-[#6b7280]">{m.subject}</span>
                <span className="text-3xs leading-4.5 text-[#6b7280]">{m.date}</span>
                {m.unread && (
                  <span className="absolute left-2.75 top-3.5 h-2 w-2 rounded-full bg-[#173fab]" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${card} flex w-full sm:w-[65%] flex-col`}>
          <div className="h-25 border-b border-[#dcdde2] px-7.5 pt-7">
            <h2 className="m-0 text-sm font-bold leading-6.5 text-neutral-950">{active.title}</h2>
            <div className="mt-1.5 text-xs  text-[#6b7280]">
              از: {active.sender} — {active.date}
            </div>
          </div>

          <div className="px-5 pt-10">
            <p className=" text-s leading-6  text-neutral-950">{active.body}</p>

            <div className="mt-3 flex items-center gap-2 text-xs text-neutral-900">
              <Building2 size={20} className="shrink-0 text-neutral-500" aria-hidden="true" />
              <span>{active.sender} — سازمان نظام مهندسی</span>
            </div>

            <div className="mt-4 mb-5 sm:mb-0 flex flex-col gap-2.5 rounded-xl border-r-4 border-[#173fab] bg-[#f7f8fa] p-3.5">
              <TextArea
                key={active.id}
                rows={2}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="پاسخ به پیام..."
                aria-label="پاسخ به پیام"
                className="border-neutral-200 bg-[#f7f8fa] text-xs text-neutral-900 placeholder:text-neutral-500"
              />

              <div>
                <Button
                  variant="solid"
                  color="input"
                  size='xs'
                  rounded="lg"
                  type="button"
                  leftIcon={<Send size={19} />}
                  textSize="xs"
                  onClick={handleSendReply}
                  className="px-4"
                >
                  <p>ارسال پاسخ</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}