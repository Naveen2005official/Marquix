using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using MMS_API.Data;
using MMS_API.DTO;
using MMS_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly JwtOption _options;
        private readonly IConfiguration configuration;
        public AuthenticationController(AppDbContext db, IConfiguration configuration ,IOptions<JwtOption> options)
        {
            this.db = db;
            _options = options.Value;
            this.configuration = configuration;
        }

        private string GetJWTToken(IEnumerable<Claim> claims)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key)); // Use UTF8 encoding
            var credentials = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            var sToken = new JwtSecurityToken(
                issuer: _options.Issuer,
                expires: DateTime.Now.AddHours(5),
                claims: claims, // Add claims here
                signingCredentials: credentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(sToken);
            return token;
        }



        [HttpPost("StaffLogin")]
        public async Task<ActionResult> StaffLogin([FromBody] StaffDTO dto)
        {
            var staff = await db.StaffLogin.FirstOrDefaultAsync(i => i.Staffid == dto.Staffid && i.Password == dto.Password);
            if (staff != null)
            {
                // Define claims
                var claims = new[]
                {
                    new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Staffid", staff.Staffid.ToString())
                 };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: signIn
                    );
                string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { Token = tokenValue, Staff = staff });
            }
            return Unauthorized();
        }


        [HttpPost("UserLogin")]
        public async Task<ActionResult> UserLogin([FromBody] StudentDTO dto)
        {
            var user = await db.StudentLogin.FirstOrDefaultAsync(i => i.Studentid == dto.Studentid && i.Password == dto.Password);
            if (user != null)
            {
                // Define claims
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Studentid), // Add student ID as Name claim
        };

                // Generate token with claims
                var token = GetJWTToken(claims);
                return Ok(new { token = token });
            }
            return Unauthorized();
        }

    }
}
