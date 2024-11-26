import React from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        
        {/* Bố cục đối xứng với form liên hệ bên trái và bản đồ bên phải */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 4,
          }}
        >
          {/* Form liên hệ */}
          <Box
            component="form"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            onSubmit={(e) => e.preventDefault()} // Tạm thời để preventDefault cho demo
          >
            <Typography variant="h6" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <TextField 
              label="Họ và tên" 
              variant="outlined" 
              required 
              sx={{ marginBottom: '16px' }} 
            />
            <TextField 
              label="Email" 
              type="email" 
              variant="outlined" 
              required 
              sx={{ marginBottom: '16px' }} 
            />
            <TextField 
              label="Tin nhắn" 
              variant="outlined" 
              multiline 
              rows={4} 
              required 
              sx={{ marginBottom: '16px' }} 
            />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{
                '&:hover': {
                  backgroundColor: '#0056b3', // Thêm màu khi hover
                },
                padding: '10px',
              }}
            >
              Gửi liên hệ
            </Button>
          </Box>

          {/* Bản đồ Google Maps */}
          <Box sx={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30673.988589331162!2d108.12500573071475!3d16.052585658554744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421934fe1a5519%3A0x45d1b7d53847d39f!2zSMOyYSBLaMOhbmggTmFtLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1730869154391!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px', borderRadius: '8px' }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
