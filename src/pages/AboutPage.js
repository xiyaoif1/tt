import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Paper, Box } from '@mui/material';
import { CalendarToday, CheckCircle, TrendingUp, MailOutline, Phone } from '@mui/icons-material';

// Mảng chứa thông tin các thành viên sáng lập
const founders = [
    { name: "Nguyễn Văn A", role: "Giám đốc điều hành", img: "founder1.jpg", description: "Với tầm nhìn chiến lược và đam mê không ngừng nghỉ." },
    { name: "Trần Thị B", role: "Giám đốc thiết kế", img: "founder2.jpg", description: "Sáng tạo, tinh tế, và luôn dẫn đầu xu hướng thời trang." },
    { name: "Lê Văn C", role: "Giám đốc marketing", img: "founder3.jpg", description: "Chuyên gia marketing, giúp CASUAL trở thành thương hiệu nổi bật." },
    { name: "Phạm Thị D", role: "Giám đốc sản phẩm", img: "founder4.jpg", description: "Chịu trách nhiệm về từng sản phẩm với sự đam mê và tận tụy." },
    { name: "Nguyễn Văn E", role: "Giám đốc tài chính", img: "founder5.jpg", description: "Đảm bảo sự vững mạnh về tài chính của CASUAL." },
    { name: "Trần Thị F", role: "Giám đốc bán hàng", img: "founder6.jpg", description: "Dẫn dắt đội ngũ bán hàng với tâm huyết và tầm nhìn." }
];

function AboutPage() {
    return (
        <Container>
            {/* Tiêu đề trang */}
            <Typography variant="h2" align="center" gutterBottom>
                Chào mừng đến với CASUAL
            </Typography>
            <Typography variant="h5" align="center" paragraph>
                Cửa hàng thời trang dành cho những tín đồ yêu thích phong cách giản dị và thoải mái.
            </Typography>

            {/* Thông tin giới thiệu về công ty */}
            <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* Thành lập */}
                    <Box display="flex" alignItems="center" flex="1" textAlign="center">
                        <CalendarToday color="primary" style={{ marginRight: '10px' }} />
                        <Typography variant="body1"><strong>Thành lập:</strong> 2010</Typography>
                    </Box>
                    {/* Sứ mệnh */}
                    <Box display="flex" alignItems="center" flex="1" textAlign="center">
                        <CheckCircle color="success" style={{ marginRight: '10px' }} />
                        <Typography variant="body1"><strong>Sứ mệnh:</strong> Mang lại phong cách thời trang thoải mái và cá tính.</Typography>
                    </Box>
                    {/* Định hướng */}
                    <Box display="flex" alignItems="center" flex="1" textAlign="center">
                        <TrendingUp color="secondary" style={{ marginRight: '10px' }} />
                        <Typography variant="body1"><strong>Định hướng:</strong> Phát triển bền vững và dẫn đầu xu hướng thời trang giản dị.</Typography>
                    </Box>
                </Box>
            </Paper>

            {/* Đội ngũ sáng lập */}
            <Typography variant="h4" align="center" gutterBottom>
                Đội ngũ sáng lập
            </Typography>

            {/* Thẻ thành viên sáng lập */}
            <Grid container spacing={4} justifyContent="center">
                {founders.map((founder, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                            style={{ 
                                transition: 'transform 0.3s ease', 
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                            // Hiệu ứng phóng to khi di chuột vào
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={founder.img} // Đường dẫn ảnh của thành viên
                                alt={founder.name} // Văn bản thay thế cho ảnh
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {founder.name} {/* Tên của thành viên */}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {founder.role} {/* Vai trò của thành viên */}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {founder.description} {/* Mô tả ngắn về thành viên */}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Thông tin liên hệ */}
            <Paper elevation={2} style={{ padding: '20px', margin: '30px 0' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Liên hệ với chúng tôi
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    {/* Số điện thoại */}
                    <Box display="flex" alignItems="center" margin="0 20px">
                        <Phone color="primary" style={{ marginRight: '10px' }} />
                        <Typography variant="body1">+84 123 456 789</Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default AboutPage;
