package com.app.auth;

import com.app.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    public String createToken(Authentication user){
        Date tokenCreateTime = new Date();
        Date tokenValidity = new Date(tokenCreateTime.getTime() + jwtExpiration);

        return Jwts.builder()
                .claims()
                .subject(user.getName())
                .add("role", user.getAuthorities())
                .expiration(tokenValidity)
                .and()
                .signWith(getSignInKey())
                .compact();
    }

    public String extractEmail(String token){
        try{
            Claims claims = decodeJWT(token);
            return claims.getSubject();
        }catch(Exception e){
            return null;
        }
    }

    private Claims decodeJWT(String token) throws Exception {
        return Jwts
                .parser()
                .verifyWith((SecretKey)getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
