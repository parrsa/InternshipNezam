"use client";

import { useCallback, useMemo, type ComponentProps } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Input } from "@/app/components/ui/input";

const ISO_FORMAT = "YYYY-MM-DD";

type InputProps = ComponentProps<typeof Input>;

export interface JalaliDatePickerProps
    extends Omit<InputProps, "value" | "onChange" | "onBlur" | "type" | "readOnly"> {
    value: string;
    onChange: (isoDate: string) => void;
    onBlur?: () => void;
    minDate?: Date;
    maxDate?: Date;
}

function isoToJalali(iso: string): DateObject | null {
    if (!iso) return null;

    const date = new DateObject({
        date: iso,
        format: ISO_FORMAT,
        calendar: gregorian,
        locale: gregorian_en,
    });

    return date.isValid ? date.convert(persian, persian_fa) : null;
}

function jalaliToIso(date: DateObject): string {
    return new DateObject(date).convert(gregorian, gregorian_en).format(ISO_FORMAT);
}

export function JalaliDatePicker({
    value,
    onChange,
    onBlur,
    minDate,
    maxDate,
    ...inputProps
}: JalaliDatePickerProps) {
    const pickerValue = useMemo(() => isoToJalali(value), [value]);

    const handleChange = useCallback(
        (selected: DateObject | DateObject[] | null) => {
            if (!selected || Array.isArray(selected)) {
                onChange("");
                return;
            }
            onChange(jalaliToIso(selected));
        },
        [onChange]
    );

    return (
        <DatePicker
            value={pickerValue}
            onChange={handleChange}
            onClose={() => {
                onBlur?.();
            }}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            minDate={minDate}
            maxDate={maxDate}
            calendarPosition="bottom-right"
            containerClassName="w-full"
            onOpenPickNewDate={false}
            render={(displayValue: string, openCalendar: () => void) => (
                <Input
                    {...inputProps}
                    type="text"
                    readOnly
                    autoComplete="off"
                    value={displayValue}
                    onFocus={openCalendar}
                    onClick={openCalendar}
                />
            )}
        />
    );
}

export default JalaliDatePicker;