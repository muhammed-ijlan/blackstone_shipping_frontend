/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Box, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { countries } from "src/utils/countries";

interface PhoneNumberInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string;
  countryIso: string;
  onCountryChange: (iso: string) => void;
}

export default function PhoneNumberInput({
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  countryIso,
  onCountryChange,
}: PhoneNumberInputProps) {
  const typeBufferRef = useRef<string>("");
  const lastTypeTsRef = useRef<number>(0);
  const TYPE_RESET_MS = 700;

  const getFlagUrl = (iso: string) =>
    `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;

  const findNextMatch = (query: string) => {
    if (!query) return null;
    const q = query.toLowerCase();

    const startIdx =
      Math.max(
        0,
        countries.findIndex((c) => c.iso === countryIso)
      ) + 1;

    const isMatch = (c: (typeof countries)[number]) =>
      c.name.toLowerCase().startsWith(q) ||
      c.code.toLowerCase().startsWith(q);

    for (let i = startIdx; i < countries.length; i++) {
      if (isMatch(countries[i])) return countries[i];
    }
    
    for (let i = 0; i < startIdx && i < countries.length; i++) {
      if (isMatch(countries[i])) return countries[i];
    }
    return null;
  };

  const handleType = (key: string) => {
    if (!/^[a-z0-9+ ]$/i.test(key)) return;

    const now = Date.now();
    const isFresh = now - lastTypeTsRef.current <= TYPE_RESET_MS;

    const nextBuffer = (isFresh ? typeBufferRef.current : "") + key.toLowerCase();
    typeBufferRef.current = nextBuffer.slice(-20); // keep buffer short
    lastTypeTsRef.current = now;

    const match = findNextMatch(typeBufferRef.current);
    if (match) onCountryChange(match.iso);
  };

  const handleSelectKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key.length === 1 || e.key === " ") {
      handleType(e.key);
      e.stopPropagation();
    }
  };
  
  const handleMenuListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key.length === 1 || e.key === " ") {
      handleType(e.key);
      e.preventDefault();
      e.stopPropagation();
    }
  };
  

  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      placeholder="Enter mobile number"
      fullWidth
      sx={{
        "& .MuiInputBase-root": { height: "60px" },
        "& input": { padding: "12px 14px" },
        "& .MuiInputLabel-root": {
          fontSize: "15px !important",
          fontWeight: "500 !important",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ p: 0 }}>
            <Select
              value={countryIso}
              onChange={(e) => onCountryChange(e.target.value)}
              onKeyDown={handleSelectKeyDown}
              variant="standard"
              disableUnderline
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "90px",
                ".MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                },
              }}
              renderValue={(selectedIso) => {
                const selectedCountry = countries.find(
                  (c) => c.iso === selectedIso
                );
                return selectedCountry ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src={getFlagUrl(selectedCountry.iso)}
                      alt={selectedCountry.name}
                      width="20"
                      style={{ borderRadius: "2px" }}
                    />
                    {selectedCountry.code}
                  </Box>
                ) : null;
              }}
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 400, width: 260 },
                },
                MenuListProps: {
                  onKeyDown: handleMenuListKeyDown,
                },
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c.iso} value={c.iso}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src={getFlagUrl(c.iso)}
                      alt={c.name}
                      width="20"
                      style={{ borderRadius: "2px" }}
                    />
                    {c.code} {c.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
}
